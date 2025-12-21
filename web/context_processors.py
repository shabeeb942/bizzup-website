import datetime

from .models import CATEGORY_CHOICES,Service,Category


def main_context(request):
    categories = Category.objects.all()
    category_choices = [x[1] for x in CATEGORY_CHOICES]
    services = Service.objects.all()
    datetime.date.today()
    return {"domain": request.META["HTTP_HOST"], "category_choices": category_choices,"services":services,"categories":categories}
