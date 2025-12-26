from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from .models import Blog, Service


# ================= STATIC PAGES =================
class StaticViewSitemap(Sitemap):
    priority = 0.8
    changefreq = "weekly"
    protocol = "https"

    def items(self):
        return [
            "web:index",
            "web:about",
            "web:services",
            "web:blog",
            "web:portfolio",
            "web:contact",
        ]

    def location(self, item):
        return reverse(item)


# ================= BLOGS =================
class BlogSitemap(Sitemap):
    priority = 0.7
    changefreq = "weekly"
    protocol = "https"

    def items(self):
        return Blog.objects.all()

    def location(self, obj):
        return obj.get_absolute_url()

    def lastmod(self, obj):
        return obj.date


# ================= SERVICES =================
class ServiceSitemap(Sitemap):
    priority = 0.7
    changefreq = "monthly"
    protocol = "https"

    def items(self):
        return Service.objects.filter(
            is_active=True,
            slug__isnull=False
        )

    def location(self, obj):
        return obj.get_absolute_url()
