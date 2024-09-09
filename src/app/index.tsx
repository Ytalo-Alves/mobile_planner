import { Input } from "@/components/input";
import {View, Text, Image} from "react-native";
import { MapPin, Calendar as IconCalendar, ArrowRight, Settings2, UserRoundPlus } from 'lucide-react-native'

import { colors } from "@/styles/colors";
import { Button } from "@/components/button";


export default function Index(){
  return (
    <View className="flex-1 items-center justify-center px-5 py-10">
      <Image source={require('@/assets/logo.png')} className="h-8" resizeMode="contain"/>
      <Text className="text-zinc-400 font-regular text-center text-lg mt-3">Convide seus amigos e planeje sua{'\n'} próxima viagem!</Text>

      <View className="w-full bg-zinc-800 p-4 rounded-xl my-8 border border-zinc-800 ">
        <Input>
          <MapPin color={colors.zinc[400]} size={25}/>
          <Input.Field placeholder="Para onde?" />
        </Input>

        <Input>
          <IconCalendar color={colors.zinc[400]} size={25}/>
          <Input.Field placeholder="Quando?" />
        </Input> 

        <View className="border-b py-3 border-zinc-700">
          <Button variant="secondary">
            <Button.Title>Alterar local/data</Button.Title>
            <Settings2 color={colors.zinc[200]}/>
          </Button>
        </View>

        <Input>
          <UserRoundPlus color={colors.zinc[400]} size={25}/>
          <Input.Field placeholder="Quem estará na viagem?" />
        </Input> 

        <Button variant="primary">
            <Button.Title>Confirmar viagem</Button.Title>
            <ArrowRight color={colors.lime[950]}/>
          </Button>
        </View>
        <Text className="text-center text-zinc-500 font-regular text-sm">
        Ao planejar sua viagem pela plann.er você{'\n'} automaticamente concorda com nossos{'\n'} <Text className="font-bold text-zinc-200">termos de uso</Text> e <Text className="font-bold text-zinc-200">políticas de privacidade</Text>.
        </Text>
    </View>
  )
}