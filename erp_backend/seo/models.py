from django.db import models


class MarketResearch(models.Model):
    industry = models.CharField(max_length=255)
    competitor = models.CharField(max_length=255)
    analysis_date = models.DateField(auto_now_add=True)
    findings = models.TextField()

    def __str__(self):
        return f"{self.industry} - {self.competitor}"


class KeywordSuggestion(models.Model):
    keyword = models.CharField(max_length=255)
    search_volume = models.IntegerField()
    competition_level = models.CharField(max_length=50)
    suggested_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.keyword


class GoogleTrendsData(models.Model):
    keyword = models.CharField(max_length=255)
    trend_data = models.JSONField()  # Stores trend data
    fetched_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.keyword


class LinkBuilding(models.Model):
    url = models.URLField()
    anchor_text = models.CharField(max_length=255)
    submission_date = models.DateField(auto_now_add=True)
    status = models.CharField(
        max_length=50,
        choices=[
            ('Pending', 'Pending'),
            ('Approved', 'Approved'),
            ('Rejected', 'Rejected'),
        ],
        default='Pending'
    )
    domain_authority = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.url} - {self.status}"


class ContentOptimization(models.Model):
    page_url = models.URLField()
    title = models.CharField(max_length=255)
    meta_description = models.TextField()
    target_keywords = models.CharField(max_length=255)
    last_updated = models.DateField(auto_now=True)

    def __str__(self):
        return self.page_url


class SEOReport(models.Model):
    page_url = models.URLField()
    report_date = models.DateField(auto_now_add=True)
    organic_traffic = models.IntegerField()
    bounce_rate = models.FloatField()
    backlinks_count = models.IntegerField()
    keyword_rankings = models.JSONField()  # Store keyword rankings data

    def __str__(self):
        return f"{self.page_url} - {self.report_date}"
