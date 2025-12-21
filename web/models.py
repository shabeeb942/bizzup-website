from django.db import models
from django.urls import reverse
from tinymce.models import HTMLField
from versatileimagefield.fields import VersatileImageField

CATEGORY_CHOICES = (
    ("Designing", "Designing"),
    ("Printing", "Printing"),
    ("Gifting", "Corporate Gifts"),
    ("Photography", "Photography"),
)


class Blog(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    image = VersatileImageField("Image", upload_to="images/blog/")
    date = models.DateField(auto_now_add=True)
    content = HTMLField()
    
    def __str__(self):
        return str(self.title)

    def get_absolute_url(self):
        return reverse("web:single_blog", kwargs={"slug": self.slug})


class Enquiry(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=255)
    message = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.name)


class Portfolio(models.Model):
    order = models.IntegerField(unique=True, blank=True, null=True)
    title = models.CharField(max_length=255)
    subtitle = models.CharField(max_length=255)
    image = models.ImageField(upload_to="portfolio_images/")

    class Meta:
        ordering = ('order',)
        verbose_name = ('What We Do')
        verbose_name_plural = ('What We Do')
    
    def __str__(self):
        return str(self.title)


class Category(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=100, blank=True)

    def get_services(self):
        return Service.objects.filter(category=self)

    
    class Meta:
        ordering = ('id',)
        verbose_name = ('Category')
        verbose_name_plural = ('Categories')

    def __str__(self):
        return f"{self.title}"  


class Service(models.Model):
    category = models.ForeignKey("web.Category", on_delete=models.CASCADE, related_name='services', blank=True, null=True)
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True,null=True,blank=True)
    image = models.ImageField(upload_to="service/")
    content = models.TextField()
    is_active = models.BooleanField(default=True)
    description = HTMLField()

    class Meta:
        ordering = ["id"]

    def get_point(self):
        return ServicePoint.objects.filter(service=self)

    def get_absolute_url(self):
        return reverse("web:service_detail", kwargs={"slug": self.slug})
    

    
    def __str__(self):
        return self.title


class Testimonial(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    position = models.CharField(max_length=255)
    image = models.ImageField(upload_to="testimonials/",)

    def __str__(self):
        return self.name


class Client(models.Model):
    name = models.CharField(max_length=255)
    image = models.ImageField(upload_to="client/")

    def __str__(self):
        return self.name

class Banner(models.Model):
    tags = models.CharField(max_length=100,verbose_name="sub title")
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    banner_image = models.ImageField(upload_to='banner')
    

    class Meta:
        verbose_name = "Banner"
        verbose_name_plural = "Banner"
    
    def __str__(self):
        return self.title
    
class Meta(models.Model):
    PAGES = [
        ("home", "Home"),
        ("about", "About"),
        ("service", "Service"),
        ("service_detail", "Service Detail"),
        ("blog", "Blog"),
        ("blog_detail", "Blog Detail"),
        ("contact", "Contact"),
        ("portfolio", "Portfolio"),
    ]
    page = models.CharField(max_length=50, choices=PAGES)
    title = models.CharField(max_length=180)
    meta_title = models.CharField(max_length=60)
    meta_description = models.CharField(max_length=160)
    url = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to="meta", blank=True, null=True)

    class Meta:
        db_table = "meta"
        managed = True
        ordering = ["-id"]
        verbose_name = "Meta"
        verbose_name_plural = "Metas"

    def __str__(self):
        return self.title
    
class Team(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to='team')
    designation= models.CharField(max_length=100)
    facebook = models.URLField(null=True,blank=True)
    instagram= models.URLField(null=True,blank=True)
    twitter = models.URLField(null=True,blank=True)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Team"
        verbose_name_plural = "Team"


class ServicePoint(models.Model):
    service = models.ForeignKey("web.Service", on_delete=models.CASCADE, related_name='service_points')
    title = models.CharField(max_length=255)
    icon = models.FileField( upload_to="service_points/", max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.title


class Booking(models.Model):
    name = models.CharField(max_length=120)
    phone = models.CharField(max_length=120)
    service = models.ForeignKey("web.Category",on_delete=models.CASCADE,blank=True,null=True)
    email = models.EmailField()
    
    class Meta:
        verbose_name = ("Quotation")
        verbose_name_plural = ("Quotations")
    

    def __str__(self):
        return str(self.name)