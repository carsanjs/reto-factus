"use client";
import {
  createContext,
  useReducer,
  useEffect,
  useRef,
  useCallback,
} from "react";

import { AuthState, initialState, AuthAction } from "../../../utils/type";

interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => Promise.resolve(),
  logout: () => {},
});

const handlers: Record<
  string,
  (state: AuthState, action: AuthAction) => AuthState
> = {
  INITIALIZED: (state: AuthState, action: AuthAction) => {
    const { isAuthenticated = false, user = null } = action.payload ?? {};
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  },
  LOGIN: (state: AuthState, action: AuthAction) => {
    const { user = null } = action.payload ?? {};
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  LOGOUT: (state: AuthState) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
};

// Proveedor de autenticación
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const isMounted = useRef<boolean>(false);

  //  Función de inicio de sesión
  const login = useCallback(async () => {
    const { user } = await usercontroller.getMe();

    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  }, []);

  const logout = () => {
    authcontroller.removeSesion();
    dispatch({
      type: "LOGOUT",
    });
  };

  // Función de re-login con refresh token
  const relogin = useCallback(
    async (refreshToken: string) => {
      try {
        await authcontroller.refreshAccessToken(refreshToken);
        await login();
      } catch (error) {
        console.error("Error en relogin:", error);
        logout();
      }
    },
    [login]
  );

  useEffect(() => {
    if (isMounted.current) return;
    const init = async () => {
      const accesstoken = authcontroller.getAccessToken();
      const refreshtoken = authcontroller.getRefreshToken();

      if (!accesstoken || !refreshtoken) {
        dispatch({
          type: "INITIALIZED",
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
        return;
      }

      if (hasExpiredToken(accesstoken)) {
        if (hasExpiredToken(refreshtoken)) {
          dispatch({
            type: "INITIALIZED",
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
          return;
        } else {
          console.log(
            "😅😅😅 por suerte podemos renovando el refreshtoken... 😁"
          );
          await relogin(refreshtoken);
        }
      } else {
        const user = await login();
        dispatch({
          type: "INITIALIZED",
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      }
    };
    init();
    isMounted.current = true;
  }, [login, relogin]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
