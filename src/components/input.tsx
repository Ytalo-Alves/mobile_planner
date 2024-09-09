import { ReactNode } from "react";
import { TextInput, View } from "react-native";
import clsx from "clsx";

type Variants = 'primary' | 'secondary' | 'tertiary'

type InputProps = {
  children: ReactNode,
  variant? : Variants
}

function Input({children, variant = 'primary'}: InputProps){
  return (
    <View className={clsx(
      'w-full h-16 flex-row items-center gap-2',
      {'h-14 px-4 rounded-lg border border-zinc-800': variant !== 'primary'},
      {'': variant === 'secondary'},
      {'': variant === 'tertiary'}
    )}>
      {children}
    </View>
  )
}

function Field(){
  return <TextInput/>
}

Input.Field = Field

export {Input}