from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, FloatField, BooleanField
from wtforms.validators import DataRequired, ValidationError

def name_length(form, field):
    name = field.data
    if len(name) > 254:
        raise ValidationError('Name must be less than 255 characters.')

def brand_length(form, field):
    brand = field.data
    if len(brand) > 254:
        raise ValidationError('Brand must be less than 255 characters.')

def description_length(form, field):
    description = field.data
    if len(description) > 254:
        raise ValidationError('Description must be less than 255 characters.')

def color_length(form, field):
    color = field.data
    if len(color) > 29:
        raise ValidationError('Color must be less than 29 characters.')

def category_length(form, field):
    category = field.data
    if len(category) > 39:
        raise ValidationError('Category must be less than 40 characters.')

def asin_length(form, field):
    name = field.data
    if len(name) > 29:
        raise ValidationError('ASIN must be less than 30 characters.')

def url_length(form, field):
    name = field.data
    if len(name) > 254:
        raise ValidationError('Image URL must be less than 255 characters.')

class ProductForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), name_length])
    price = IntegerField("Price", validators=[DataRequired()])
    brand = StringField("Brand", validators=[DataRequired(), brand_length])
    description = StringField("Description", validators=[DataRequired(), description_length])
    length = FloatField("Length", validators=[DataRequired()])
    width = FloatField("Width", validators=[DataRequired()])
    height = FloatField("Height", validators=[DataRequired()])
    weight = FloatField("Weight", validators=[DataRequired()])
    color = StringField("Color", validators=[DataRequired(), color_length])
    category = StringField("Category", validators=[DataRequired(), category_length])
    # Maybe make not required.
    asin = StringField("ASIN", validators=[DataRequired(), asin_length])
    prime = BooleanField("Prime", validators=[DataRequired()])
    image = StringField("Image URL", validators=[DataRequired(), url_length])


class UpdateProductForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired(), name_length])
    price = IntegerField("Price", validators=[DataRequired()])
    brand = StringField("Brand", validators=[DataRequired(), brand_length])
    description = StringField("Description", validators=[DataRequired(), description_length])
    length = FloatField("Length", validators=[DataRequired()])
    width = FloatField("Width", validators=[DataRequired()])
    height = FloatField("Height", validators=[DataRequired()])
    weight = FloatField("Weight", validators=[DataRequired()])
    color = StringField("Color", validators=[DataRequired(), color_length])
    category = StringField("Category", validators=[DataRequired(), category_length])
    # Maybe make not required.
    asin = StringField("ASIN", validators=[DataRequired(), asin_length])
    prime = BooleanField("Prime", validators=[DataRequired()])
    image = StringField("Image URL", validators=[DataRequired(), url_length])
