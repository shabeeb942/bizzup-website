from django import forms

from .models import Enquiry,Booking
from django.utils.translation import gettext_lazy as _

class EnquiryForm(forms.ModelForm):
    class Meta:
        model = Enquiry
        fields = ("name", "email", "phone", "message")
        widgets = {
            "name": forms.TextInput(attrs={"class": "form-control", "placeholder": _("Name")}),
            "email": forms.EmailInput(attrs={"class": "form-control", "placeholder": _("Email")}),
            "phone": forms.TextInput(attrs={"class": "form-control", "placeholder": _("Phone")}),
            "message": forms.Textarea(attrs={"class": "form-control", "placeholder": _("Message")}),
        }


from django import forms
from django.utils.translation import gettext_lazy as _ 

class BookingForm(forms.ModelForm):
    class Meta:
        model = Booking
        fields = '__all__'
        widgets = {
            'service': forms.Select(
                attrs={
                    "class": "required form-control",
                    "placeholder": _("Service"),
                    "required": True,
                    "name": "service",
                }
            ),
            "name": forms.TextInput(
                attrs={
                    "class": "required form-control",
                    "placeholder": _("Your Name"),
                    "required": True,
                    "name": "name",
                }
            ),
            "phone": forms.TextInput(
                attrs={
                    "class": "required form-control",
                    "placeholder": _("Your Phone"),
                    "required": True,
                    "name": "phone",
                }
            ),
            "email": forms.EmailInput(
                attrs={
                    "class": "required form-control",
                    "placeholder": _("Email *"),
                    "required": True,
                }
            ),
            "message": forms.Textarea(
                attrs={
                    "class": "required form-control",
                    "placeholder": _("Type Your Message"),
                    "required": True,
                    "name": "message",
                }
            ),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['service'].empty_label = _("Select Service") 