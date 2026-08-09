from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class Servicio(db.Model):
    """Un plan especifico dentro de una categoria: ej. Bodas - Basico"""
    __tablename__ = "servicios"

    id = db.Column(db.Integer, primary_key=True)
    categoria = db.Column(db.String(60), nullable=False)   # "Bodas", "Videos Musicales", etc.
    plan = db.Column(db.String(30), nullable=False)         # "Basico", "Regular", "Premium"
    nombre = db.Column(db.String(120), nullable=False)      # texto para mostrar, ej "Bodas - Basico"
    precio = db.Column(db.Float, nullable=False)
    activo = db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            "id": self.id,
            "categoria": self.categoria,
            "plan": self.plan,
            "nombre": self.nombre,
            "precio": self.precio,
            "activo": self.activo,
        }


class Cita(db.Model):
    """Una reserva hecha por un cliente."""
    __tablename__ = "citas"

    id = db.Column(db.Integer, primary_key=True)

    cliente_nombre = db.Column(db.String(120), nullable=False)
    cliente_email = db.Column(db.String(120), nullable=False)
    cliente_telefono = db.Column(db.String(30), nullable=True)

    servicio_id = db.Column(db.Integer, db.ForeignKey("servicios.id"), nullable=False)
    servicio = db.relationship("Servicio")

    fecha = db.Column(db.String(20), nullable=False)
    hora = db.Column(db.String(10), nullable=False)
    notas = db.Column(db.Text, nullable=True)

    precio_total = db.Column(db.Float, nullable=False)
    deposito_requerido = db.Column(db.Float, nullable=False)
    pagado = db.Column(db.Boolean, default=False)
    fecha_pago = db.Column(db.DateTime, nullable=True)
    estado = db.Column(db.String(20), default="pendiente")
    creada_en = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "cliente_nombre": self.cliente_nombre,
            "cliente_email": self.cliente_email,
            "cliente_telefono": self.cliente_telefono,
            "servicio_id": self.servicio_id,
            "servicio_nombre": self.servicio.nombre if self.servicio else None,
            "categoria": self.servicio.categoria if self.servicio else None,
            "plan": self.servicio.plan if self.servicio else None,
            "fecha": self.fecha,
            "hora": self.hora,
            "notas": self.notas,
            "precio_total": self.precio_total,
            "deposito_requerido": self.deposito_requerido,
            "pagado": self.pagado,
            "estado": self.estado,
            "creada_en": self.creada_en.isoformat() if self.creada_en else None,
        }