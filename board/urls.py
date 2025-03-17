from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("create-issue/", views.create_issues, name="create_issue"),
    path("read-issues/", views.read_issues, name="read_issues"),
    path("update-issues/<int:issue_id>/", views.update_issues, name="update_issues"),
    path("delete-issues/<int:issue_id>/", views.delete_issues, name="delete_issues"),
]
