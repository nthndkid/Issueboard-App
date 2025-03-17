from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from .models import Issue
import json


# Create your views here.
def home(request):
    return render(request, 'board/home.html')

def create_issues(request):
    if request.method == "POST":
        data = json.loads(request.body)
        issue = Issue.objects.create(
            title =  data["title"],
            description = data["description"],
            priority = data["priority"],
        )
        return JsonResponse({"message": "Issue added", "issue":issue.issue_id})


def read_issues(request):
    issues = list(Issue.objects.values())
    return JsonResponse({"issues": issues})


def update_issues(request, issue_id):
    if request.method == "PATCH":
        issue = get_object_or_404(Issue, issue_id=issue_id)

        if issue.status == "Open":
            issue.status = "In Progress"
        elif issue.status == "In Progress":
            issue.status = "Resolved"
        else:
            issue.status = "Open"

        issue.save()
        return JsonResponse({"message": "Status updated", "status": issue.status})
    
def delete_issues(request, issue_id):
    if request.method == 'DELETE':
        # model_id = arg_id
        issue = get_object_or_404(Issue, issue_id=issue_id)
        issue.delete()
        return JsonResponse({"message": "Issue deleted"})
    