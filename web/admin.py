from django.contrib import admin

from .models import Blog, Client, Enquiry, Portfolio, Service, Testimonial,Banner,Meta,Team,Category,ServicePoint,Booking


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ("title","date")
    list_filter = ("date",)
    search_fields = ("title","date")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "timestamp")
    list_filter = ("name", "email", "phone", "timestamp")
    search_fields = ("name", "email", "phone", "timestamp")
    ordering = ("name", "email", "phone", "timestamp")


@admin.register(Portfolio)
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ("title", "subtitle", "image",)
    list_filter = ("title", "subtitle", "image",)
    search_fields = ("title", "subtitle", "image",)
    def get_fields(self, request, obj=None):
        return [
            "order",
            "title", "title_ar", 
             "image",
            "subtitle", "subtitle_ar",
        ]


class ServicePointInline(admin.StackedInline):
    model = ServicePoint
    extra = 1
    def get_fields(self, request, obj=None):
        return [
            "title", "title_ar", 
             "icon",
            "description", "description_ar",
        ]


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ["title",'is_active',]
    list_filter = ["category",'is_active']  
    search_fields = ("title",)
    prepopulated_fields={'slug':('title',)}
    inlines = [ServicePointInline]


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ["name", "description"]
    search_fields = ("name", "description")


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ["name"]

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ('title','tags')
    def get_fields(self, request, obj=None):
        return [
            "title", "title_ar", 
             "tags", "tags_ar",
             "banner_image",
            "description", "description_ar",
        ]

@admin.register(Meta)
class MetaAdmin(admin.ModelAdmin):
    list_display = ('page','title')

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ('name',)


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('title',)
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ("name","email","phone")