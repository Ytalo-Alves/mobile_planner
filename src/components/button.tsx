import { createContext, useContext } from "react";
import { Text, TextProps, TouchableOpacity, TouchableOpacityProps, ActivityIndicator} from "react-native";
import { clsx } from "clsx";
import { colors } from "@/styles/colors";

type Variants = 'primary' | 'secondary';

type ButtonProps = TouchableOpacityProps & {
  variant?: Variants,
  isLoading?: boolean,
}

const themeContext = createContext<{variant?: Variants}>({})


function Button({children ,variant = 'primary', isLoading, ...rest}: ButtonProps){
  return <TouchableOpacity 
  className={clsx("w-full h-11 flex-row items-center justify-center rounded-lg gap-2",
    {
      'bg-lime-300' : variant === 'primary',
      'bg-zinc-700' : variant === 'secondary'
    }
  )}
  activeOpacity={0.7}
  disabled={isLoading}
  {...rest}>
    <themeContext.Provider value={{variant}}>
    { isLoading ? <ActivityIndicator color={colors.lime[950]}/> : children}
    </themeContext.Provider>
  </TouchableOpacity>
}

function Title({children}: TextProps){
  const { variant } = useContext(themeContext);
  return <Text className={clsx(
    'text-base font-semibold',
    {'text-lime-950' : variant === 'primary',
    'text-zinc-200' : variant === 'secondary',
    })}>{children}</Text>
}

Button.Title = Title
export {Button}