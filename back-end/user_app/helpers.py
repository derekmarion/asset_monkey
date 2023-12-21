import requests

def check_email_disposable(email):
    url = "https://disify.com/api/email"
    data = {'email': email}

    try:
        response = requests.post(url, data=data)
        response_data = response.json()

        # Check if the email is disposable
        is_disposable = response_data.get('disposable')

        return is_disposable

    except Exception as e:
        print(f"Error checking email: {e}")
        return None