from django.urls import path

from . import views

app_name = "web"

urlpatterns = [
    path("", views.index, name="index"),
    path("about/", views.about, name="about"),
    path("blog/", views.blog, name="blog"),
    path("contact/", views.contact, name="contact"),
    path("portfolio/", views.portfolio, name="portfolio"),
    path("services/", views.services, name="services"),
    path("request-for-quotation/", views.request_for_quotation, name="request-for-quotation"),
    path("blog/<slug:slug>/", views.single_blog, name="single_blog"),
    path("service/<slug:slug>/", views.service_details, name="service_detail"),
   
]
