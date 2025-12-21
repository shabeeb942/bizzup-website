from modeltranslation.translator import register, TranslationOptions
from .models import (
    Testimonial, 
    Service, 
    Banner, 
    Blog, 
    Category,
    Portfolio,
    ServicePoint

)

@register(Testimonial)
class TestimonialTranslationOptions(TranslationOptions):
    fields = ('name', 'position', 'description')


@register(Service)
class ServiceTranslationOptions(TranslationOptions):
    fields = ('title','content' ,'description',)


@register(Banner)
class BannerTranslationOptions(TranslationOptions):
    fields = ('title', 'tags', 'description',)


@register(Blog)
class BlogTranslationOptions(TranslationOptions):
    fields = ('title', 'content',)


@register(Category)
class CategoryTranslationOptions(TranslationOptions):
    fields = ('title',)


@register(Portfolio)
class PortfolioTranslationOptions(TranslationOptions):
    fields = ('title','subtitle',)


@register(ServicePoint)
class ServicePointTranslationOptions(TranslationOptions):
    fields = ('title','description',)