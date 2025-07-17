from django.urls import path
from . import views

urlpatterns = [
    path("journals/", views.journals, name = "journals" ),
    path("journals/<int:journal_id>/", views.journals_detail, name = "journals_detail" ),
]
