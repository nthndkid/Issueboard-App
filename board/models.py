from django.db import models

# Create your models here.
class Issue(models.Model):
    STATUS_CHOICES = [
        ("Open", "Open"),
        ("In Progress", "In Progress"),
        ("Resolved", "Resolved"),
    ]

    PRIORITY_CHOICES = [
        ("Low", "Low"),
        ("Medium", "Medium"),
        ("High", "High"),
    ]
    issue_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, null=False, default="Low")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, null=False, default="Open")

    def __str__(self):
        return f"{self.issue_id} + {self.title} + {self.description}"
    

    