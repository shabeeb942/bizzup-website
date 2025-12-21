from django.core.mail import send_mail
from django.shortcuts import get_object_or_404, redirect, render
from django.urls import reverse
from django.http import JsonResponse
import urllib.parse
from .forms import EnquiryForm,BookingForm
from .models import Blog, Client, Portfolio, Service, Testimonial,Banner,CATEGORY_CHOICES,Meta,Team,Category


def index(request):
    services = Service.objects.filter(is_active=True)
    portfolios = Portfolio.objects.all()
    testimonials = Testimonial.objects.all()
    clients = Client.objects.all()
    blogs = Blog.objects.all()[:3]
    banner = Banner.objects.all()
    meta = Meta.objects.filter(page="home").first()
   
    context = {
        "is_index": True,
        "services": services,
        "portfolios": portfolios,
        "testimonials": testimonials,
        "clients": clients,
        "blogs": blogs,
        "banners":banner,
        'meta':meta,
    }
    return render(request, "web/index.html", context)


def about(request):
    services = Service.objects.all()[:6]
    clients = Client.objects.all()
    testimonial=Testimonial.objects.all()
    meta = Meta.objects.filter(page="about").first()
    team = Team.objects.all()
    context = {
        "is_about": True,
        "services": services,
        "clients": clients,
        'testimonials':testimonial,
        'meta':meta,
        'team':team

       
    }
    return render(request, "web/about.html", context)


def blog(request):
    blogs = Blog.objects.all()
    meta = Meta.objects.filter(page="blog").first()
    context = {
        "is_blog": True,
        "blogs": blogs,
        'meta':meta
       
    }
    return render(request, "web/blog.html", context)


def contact(request):
    meta = Meta.objects.filter(page="contact_us").first()
    form = EnquiryForm(request.POST or None)
    if request.method == 'POST':
        form = EnquiryForm(request.POST)
        if form.is_valid():
            enquiry = form.save(commit=False)
            enquiry.contact = contact
            enquiry.save()

            message = (
                f'Name: {form.cleaned_data["name"]} \n'
                f'Phone: {form.cleaned_data["phone"]}\n'
                f'Email: {form.cleaned_data["email"]}\n'
                f'Message: {form.cleaned_data["message"]}\n'
            )

            whatsapp_api_url = "https://api.whatsapp.com/send"
            phone_number = "+966564413320"
            encoded_message = urllib.parse.quote(message)
            whatsapp_url = f"{whatsapp_api_url}?phone={phone_number}&text={encoded_message}"

            return redirect(whatsapp_url)

    else:
        form = EnquiryForm()

    context ={"is_contact": True, "form": form, "meta":meta}
    return render(request, "web/contact.html", context)


def portfolio(request):
    portfolios = Portfolio.objects.all()
    categories = Category.objects.prefetch_related("services").all()
    meta = Meta.objects.filter(page="portfolio").first()
    context = {
        "is_portfolio": True,
        "portfolios": portfolios,   
        "categories": categories,
        'meta':meta
      
    }
    return render(request, "web/portfolio.html", context)


def services(request):
    
    services = Service.objects.filter(is_active=True)
    portfolios = Portfolio.objects.all()
    meta = Meta.objects.filter(page="service").first()
    context = {
        "is_services": True,
        "services": services,
        'portfolios':portfolios,
        'meta':meta
    }
    return render(request, "web/service.html", context)


def single_blog(request, slug):
    blog = get_object_or_404(Blog, slug=slug)
    blogs= Blog.objects.exclude(id=blog.id)
    meta = Meta.objects.filter(page="blog_detail").first()
    context = {"is_single_blog": True, "blog": blog, "title": f"{blog.title}","blogs":blogs,'meta':meta}
    return render(request, "web/blog_detail.html", context)


def service_details(request,slug):
    service = Service.objects.get(slug=slug)
    # services= Service.objects.exclude(id=service_detail.id)
    meta = Meta.objects.filter(page="service_detail").first()
    # service = Service.objects.all() 
    context={
        'service':service,
        # 'services':services,
        # 'service':service,
        'meta':meta
    }
    return render(request,'web/service_detail1.html',context)



def request_for_quotation(request):
    meta = Meta.objects.filter(page="home").first()
    banners = Banner.objects.all()
    clients = Client.objects.all()
    services = Service.objects.all()
    testimonials = Testimonial.objects.all()
    form = BookingForm(request.POST or None)
    if request.method == "POST":
        if form.is_valid():
            form.save()
            response_data = {
                "status": "true",
                "title": "Successfully Submitted",
                "message": "Message successfully updated",
            }
        else:
            print(form.errors)
            response_data = {
                "status": "false",
                "title": "Form validation error",
            }
        return JsonResponse(response_data)
    else:
        context = {"is_request_for_quotation": True, "form": form, "clients":clients, "services":services,"banners":banners,"testimonials":testimonials,"meta":meta}
    return render(request, "web/request_for_quotation.html", context)