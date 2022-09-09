import { renderHook, act, waitFor } from '@testing-library/react';
import { Credential, User } from './model';
import { useLogin } from './login.hook';
import * as api from './api';

describe('login hook spec', () => {
  it('should return an object: credential with default values and setCredential a function when it calls it', () => {
    const { result } = renderHook(useLogin);

    const defaultCredential: Credential = { name: '', password: '' };

    expect(result.current.credential).toEqual(defaultCredential);
    expect(result.current.setCredential).toEqual(expect.any(Function));
  });

  it('should update credential when it calls setCredential', () => {
    const newCredential: Credential = { name: 'admin', password: 'test' };

    const { result } = renderHook(useLogin);

    act(() => {
      result.current.setCredential(newCredential);
    });

    expect(result.current.credential).toEqual(newCredential);
  });

  it('should return user equals null and onLogin function', () => {
    const { result } = renderHook(useLogin);

    expect(result.current.user).toBeNull();
    expect(result.current.onLogin).toEqual(expect.any(Function));
  });

  it('should update user when it send valid credentials using onLogin', async () => {
    const adminUser: User = { email: 'admin@email.com', role: 'admin' };
    const loginStub = jest.spyOn(api, 'login').mockResolvedValue(adminUser);

    const { result } = renderHook(useLogin);

    act(() => {
      result.current.onLogin();
    });

    expect(loginStub).toHaveBeenCalled();
    await waitFor(() => {
      expect(result.current.user).toEqual(adminUser);
    });
  });
});
