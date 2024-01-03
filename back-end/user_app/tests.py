from django.test import TestCase
from rest_framework.test import APIClient
from django.urls import reverse


# Create your tests here.
class SignUpViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse("signup")

    def test_signup(self):
        # Hit signup endpoint
        response = self.client.post(
            self.url,
            format="json",
            data={"email": "test@example.com", "password": "testpassword"},
        )
        # Check if the login was successful
        self.assertEqual(response.status_code, 201)

        # Retrieve the token from the response
        token_key = response.data.get("token", None)
        self.assertIsNotNone(token_key, "Token not found in response")

        # Include the Authorization token in the request headers
        self.client.credentials(AUTHORIZATION=f"Token {token_key}")
