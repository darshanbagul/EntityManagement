from rest_framework import permissions


class IsAuthorOfRP(permissions.BasePermission):
    def has_object_permission(self, request, view, retail_partner):
        if request.user:
            return retail_partner.author == request.user
        return False