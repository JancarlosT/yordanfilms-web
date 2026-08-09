from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
from models import db, Servicio, Cita
from flask_mail import Mail, Message
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///negocio.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db.init_app(app)

app.config["MAIL_SERVER"] = "smtp.gmail.com"
app.config["MAIL_PORT"] = 587
app.config["MAIL_USE_TLS"] = True
app.config["MAIL_USERNAME"] = os.getenv("MAIL_USERNAME")
app.config["MAIL_PASSWORD"] = os.getenv("MAIL_PASSWORD")
mail = Mail(app)


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


@app.route("/api/servicios", methods=["GET"])
def listar_servicios():
    servicios = Servicio.query.filter_by(activo=True).all()
    return jsonify([s.to_dict() for s in servicios])


@app.route("/api/servicios", methods=["POST"])
def crear_servicio():
    data = request.get_json()
    campos_requeridos = ["categoria", "plan", "nombre", "precio"]
    faltantes = [c for c in campos_requeridos if not data.get(c) and data.get(c) != 0]
    if faltantes:
        return jsonify({"error": f"Faltan campos: {', '.join(faltantes)}"}), 400

    nuevo = Servicio(
        categoria=data["categoria"],
        plan=data["plan"],
        nombre=data["nombre"],
        precio=data["precio"],
    )
    db.session.add(nuevo)
    db.session.commit()
    return jsonify(nuevo.to_dict()), 201


@app.route("/api/citas", methods=["GET"])
def listar_citas():
    fecha = request.args.get("fecha")
    query = Cita.query
    if fecha:
        query = query.filter_by(fecha=fecha)
    citas = query.order_by(Cita.fecha, Cita.hora).all()
    return jsonify([c.to_dict() for c in citas])


def enviar_notificacion_reserva(cita):
    try:
        msg = Message(
            subject=f"Nueva reserva: {cita.servicio.categoria} - {cita.servicio.plan}",
            sender=app.config["MAIL_USERNAME"],
            recipients=[os.getenv("MAIL_DESTINO")],
        )
        msg.body = f"""Nueva reserva recibida en YordanFilms

Cliente: {cita.cliente_nombre}
Correo: {cita.cliente_email}
Telefono: {cita.cliente_telefono or "No proporcionado"}

Servicio: {cita.servicio.categoria} - Plan {cita.servicio.plan}
Fecha: {cita.fecha}
Hora: {cita.hora}

Precio total: ${cita.precio_total:.2f}
Deposito requerido (50%): ${cita.deposito_requerido:.2f}

Notas del cliente:
{cita.notas or "Ninguna"}
"""
        mail.send(msg)
    except Exception as e:
        # Si el correo falla, no queremos que se caiga toda la reserva.
        # Solo lo registramos en la terminal para revisarlo despues.
        print(f"Error al enviar correo de notificacion: {e}")


@app.route("/api/citas", methods=["POST"])
def crear_cita():
    data = request.get_json()

    campos_requeridos = [
        "cliente_nombre",
        "cliente_email",
        "servicio_id",
        "fecha",
        "hora",
    ]
    faltantes = [c for c in campos_requeridos if not data.get(c)]
    if faltantes:
        return jsonify({"error": f"Faltan campos: {', '.join(faltantes)}"}), 400

    servicio = Servicio.query.get(data["servicio_id"])
    if not servicio:
        return jsonify({"error": "Servicio no encontrado"}), 404

    choque = Cita.query.filter_by(fecha=data["fecha"], hora=data["hora"]).first()
    if choque:
        return jsonify({"error": "Ese horario ya esta reservado"}), 409

    precio_total = servicio.precio
    deposito = round(precio_total * 0.5, 2)

    nueva_cita = Cita(
        cliente_nombre=data["cliente_nombre"],
        cliente_email=data["cliente_email"],
        cliente_telefono=data.get("cliente_telefono", ""),
        servicio_id=servicio.id,
        fecha=data["fecha"],
        hora=data["hora"],
        notas=data.get("notas", ""),
        precio_total=precio_total,
        deposito_requerido=deposito,
        pagado=False,
        estado="pendiente",
    )
    db.session.add(nueva_cita)
    db.session.commit()

    enviar_notificacion_reserva(nueva_cita)

    return jsonify(nueva_cita.to_dict()), 201


@app.route("/api/citas/<int:cita_id>/pagar", methods=["POST"])
def simular_pago(cita_id):
    cita = Cita.query.get(cita_id)
    if not cita:
        return jsonify({"error": "Cita no encontrada"}), 404
    if cita.pagado:
        return jsonify({"error": "Esta cita ya fue pagada"}), 400

    cita.pagado = True
    cita.fecha_pago = datetime.utcnow()
    cita.estado = "confirmada"
    db.session.commit()

    return jsonify({"mensaje": "Pago simulado con exito", "cita": cita.to_dict()})


@app.route("/api/citas/<int:cita_id>", methods=["DELETE"])
def cancelar_cita(cita_id):
    cita = Cita.query.get(cita_id)
    if not cita:
        return jsonify({"error": "Cita no encontrada"}), 404
    cita.estado = "cancelada"
    db.session.commit()
    return jsonify({"mensaje": "Cita cancelada", "cita": cita.to_dict()})


def seed_data():
    if Servicio.query.count() == 0:
        planes = [
            # Bodas
            ("Bodas", "Basico", "Bodas - Basico", 500),
            ("Bodas", "Regular", "Bodas - Regular", 900),
            ("Bodas", "Premium", "Bodas - Premium", 1500),
            # Videos Musicales
            ("Videos Musicales", "Basico", "Videos Musicales - Basico", 350),
            ("Videos Musicales", "Regular", "Videos Musicales - Regular", 700),
            ("Videos Musicales", "Premium", "Videos Musicales - Premium", 1200),
            # Eventos
            ("Eventos", "Basico", "Eventos - Basico", 250),
            ("Eventos", "Regular", "Eventos - Regular", 450),
            ("Eventos", "Premium", "Eventos - Premium", 800),
            # Fotografia
            ("Fotografia", "Basico", "Fotografia - Basico", 95),
            ("Fotografia", "Regular", "Fotografia - Regular", 160),
            ("Fotografia", "Premium", "Fotografia - Premium", 290),
        ]
        for categoria, plan, nombre, precio in planes:
            db.session.add(
                Servicio(categoria=categoria, plan=plan, nombre=nombre, precio=precio)
            )
        db.session.commit()
        print("Servicios (categorias y planes) creados.")


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        seed_data()
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)