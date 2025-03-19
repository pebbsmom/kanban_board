import { UserLogin } from "../interfaces/UserLogin";

interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const login = async (userInfo: UserLogin): Promise<LoginResponse> => {
  try {
    console.log('userInfo:', userInfo);
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the login request:', error);
    return Promise.reject(error);
  }
}

export { login };
