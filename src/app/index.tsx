import { Input } from "@/components/input";
import { View, Text, Image } from "react-native";
import {
  MapPin,
  Calendar as IconCalendar,
  ArrowRight,
  Settings2,
  UserRoundPlus,
} from "lucide-react-native";

import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { useState } from "react";

enum StepForm {
  TRIP_DETAILS = 1,
  ADD_EMAIL = 2,
}

export default function Index() {
  const [stepForm, setStepForm] = useState(StepForm.TRIP_DETAILS);

  function handleNextStepForm() {
    if (stepForm === StepForm.TRIP_DETAILS) {
      return setStepForm(StepForm.ADD_EMAIL);
    }
  }

  return (
    <View className="flex-1 items-center justify-center px-5 py-10">
      <Image
        source={require("@/assets/logo.png")}
        className="h-10"
        resizeMode="contain"
      />

      <Image source={require("@/assets/bg.png")} className="absolute"/>
      <Text className="text-zinc-400 font-regular text-center text-lg mt-3">
        Convide seus amigos e planeje sua{"\n"} próxima viagem!
      </Text>

      <View className="w-full bg-zinc-800 p-4 rounded-xl my-8 border border-zinc-800 ">
        <Input>
          <MapPin color={colors.zinc[400]} size={20} />
          <Input.Field placeholder="Para onde?" editable={stepForm === StepForm.TRIP_DETAILS} />
        </Input>

        <Input>
          <IconCalendar color={colors.zinc[400]} size={20} />
          <Input.Field placeholder="Quando?" editable={stepForm === StepForm.TRIP_DETAILS}/>
        </Input>

      {
        stepForm === StepForm.ADD_EMAIL && 
        <>
        <View className="border-b py-3 border-zinc-700">
          <Button
            variant="secondary"
            onPress={() => setStepForm(StepForm.TRIP_DETAILS)}
          >
            <Button.Title>Alterar local/data</Button.Title>
            <Settings2 color={colors.zinc[200]} />
          </Button>
        </View>

        <Input>
          <UserRoundPlus color={colors.zinc[400]} size={20} />
          <Input.Field placeholder="Quem estará na viagem?" />
        </Input>
        </>
      }

        <Button variant="primary" onPress={handleNextStepForm}>
          <Button.Title>
            {
              stepForm === StepForm.TRIP_DETAILS ? "Confirmar" : "Confirmar viagem"
            }
          </Button.Title>
          <ArrowRight color={colors.lime[950]} />
        </Button>
      </View>
      <Text className="text-center text-zinc-500 font-regular text-sm">
        Ao planejar sua viagem pela plann.er você{"\n"} automaticamente concorda
        com nossos{" "}
        <Text className="font-bold text-zinc-200 underline">termos de uso{"\n"}</Text> e{" "}
        <Text className="font-bold text-zinc-200">
          políticas de privacidade
        </Text>
        .
      </Text>
    </View>
  );
}
