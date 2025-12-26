from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from django.contrib import sitemaps
from django.contrib.sitemaps.views import sitemap
from web.sitemaps import StaticViewSitemap, BlogSitemap, ServiceSitemap

sitemaps = {
    "static": StaticViewSitemap,
    "blogs": BlogSitemap,
    "services": ServiceSitemap,
}

urlpatterns = (
    i18n_patterns(
        path("admin/", admin.site.urls),
        path("", include("web.urls", namespace="web")),
        path("tinymce/", include("tinymce.urls")),
        path(
        "sitemap.xml",
        sitemap,
        {"sitemaps": sitemaps},
        name="django.contrib.sitemaps.views.sitemap",
    ),
        path("translate/", include("rosetta.urls")),
        path("i18n/", include("django.conf.urls.i18n")),
        path("sitemap.xml", TemplateView.as_view(template_name="sitemap.xml", content_type="text/xml")),
        path("robots.txt", TemplateView.as_view(template_name="robots.txt", content_type="text/plain")),
        prefix_default_language=True,
    )
    + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
)

admin.site.site_header = "bizzuparabia Administration"
admin.site.site_title = "bizzuparabia Admin Portal"
admin.site.index_title = "Welcome to bizzuparabia Admin Portal"
