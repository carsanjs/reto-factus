"use client";
import {
  createContext,
  useReducer,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { AuthState, initialState, AuthAction } from "../../../utils/type";
import { AuthController } from "../controller/auth.controller";

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
    const { user } = await AuthController.getMe();

    dispatch({
      type: "LOGIN",
      payload: {
        user,
      },
    });
  }, []);

  const logout = () => {
    AuthController.removeSesion();
    dispatch({
      type: "LOGOUT",
    });
  };

  // Función de re-login con refresh token
  const relogin = useCallback(async () => {
    try {
      await AuthController.refreshAccessToken();
      await login();
    } catch (error) {
      console.error("Error en relogin:", error);
      logout();
    }
  }, [login]);

  useEffect(() => {
    if (isMounted.current) return;
    const init = async () => {
      const accesstoken = AuthController.getAccessToken();
      const refreshtoken = AuthController.getRefreshToken();

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
      try {
        const user = await login();
        dispatch({
          type: "INITIALIZED",
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } catch (error) {
        throw new Error(" error al intentar autenticarse", error);
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
