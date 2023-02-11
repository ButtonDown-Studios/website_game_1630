from django.contrib import admin
from import_export.admin import ExportActionModelAdmin

from import_export import resources
from game_1630.app.models import Email


class EmailResource(resources.ModelResource):
    class Meta:
        model = Email


@admin.register(Email)
class EmailAdmin(ExportActionModelAdmin):
    resource_class = EmailResource
    list_display = ("id", "created", "email")
    list_filter = ("created",)
    search_fields = ("email",)

