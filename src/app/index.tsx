import { Input } from "@/components/input";
import { View, Text, Image, Keyboard, Alert } from "react-native";
import {
  MapPin,
  Calendar as IconCalendar,
  ArrowRight,
  Settings2,
  UserRoundPlus,
  AtSign,
} from "lucide-react-native";

import { colors } from "@/styles/colors";
import { Button } from "@/components/button";
import { useState } from "react";
import { Modal } from "@/components/modal";
import { Calendar } from "@/components/calendar";
import { calendarUtils, DatesSelected } from "@/utils/calendarUtils";
import type { DateData } from "react-native-calendars";
import dayjs from "dayjs";
import { GuestEmail } from "@/components/email";

enum StepForm {
  TRIP_DETAILS = 1,
  ADD_EMAIL = 2,
}

enum MODAL {
  NONE = 0,
  CALENDAR = 1,
  GUESTS = 2,
}

export default function Index() {
  const [stepForm, setStepForm] = useState(StepForm.TRIP_DETAILS);
  const [destination, setDestination] = useState('')

  // MODAL
  const [showModal, setShowModal] = useState(MODAL.NONE);

  // DATA
  const [selectedDates, setSelectedDates] = useState({} as DatesSelected);

  function handleNextStepForm() {
    if(destination.trim().length === 0 || !selectedDates.startsAt || !selectedDates.endsAt){
      return Alert.alert('Detalhes da viagem',
        'preencha todas as informações de viagem para seguir')
    }

    if(destination.length < 4){
      return Alert.alert('Detalhes da viagem',
        'O nome do destino precisa ter pelo menos 4 caracteres')
    }

    if (stepForm === StepForm.TRIP_DETAILS) {
      return setStepForm(StepForm.ADD_EMAIL);
    }
  }

  function handleSelectDate(selectedDay: DateData){
    const dates = calendarUtils.orderStartsAtAndEndsAt({
      startsAt: selectedDates.startsAt,
      endsAt: selectedDates.endsAt,
      selectedDay
    })

    setSelectedDates(dates)
  }

  return (
    <View className="flex-1 items-center justify-center px-5 py-10">
      <Image
        source={require("@/assets/logo.png")}
        className="h-10"
        resizeMode="contain"
      />

      <Image source={require("@/assets/bg.png")} className="absolute" />
      <Text className="text-zinc-400 font-regular text-center text-lg mt-3">
        Convide seus amigos e planeje sua{"\n"} próxima viagem!
      </Text>

      <View className="w-full bg-zinc-800 p-4 rounded-xl my-8 border border-zinc-800 ">
        <Input>
          <MapPin color={colors.zinc[400]} size={20} />
          <Input.Field
            placeholder="Para onde?"
            editable={stepForm === StepForm.TRIP_DETAILS}
            onChangeText={setDestination}
            value={destination}
          />
        </Input>

        <Input>
          <IconCalendar color={colors.zinc[400]} size={20} />
          <Input.Field
            placeholder="Quando?"
            editable={stepForm === StepForm.TRIP_DETAILS}
            onFocus={() => Keyboard.dismiss()}
            showSoftInputOnFocus={false}
            onPressIn={() =>
              stepForm === StepForm.TRIP_DETAILS &&
              setShowModal(MODAL.CALENDAR)
            }
            value={selectedDates.formatDatesInText}
          />
        </Input>

        {stepForm === StepForm.ADD_EMAIL && (
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
        )}

        <Button variant="primary" onPress={handleNextStepForm}>
          <Button.Title>
            {stepForm === StepForm.TRIP_DETAILS
              ? "Confirmar"
              : "Confirmar viagem"}
          </Button.Title>
          <ArrowRight color={colors.lime[950]} />
        </Button>
      </View>
      <Text className="text-center text-zinc-500 font-regular text-sm">
        Ao planejar sua viagem pela plann.er você{"\n"} automaticamente concorda
        com nossos{" "}
        <Text className="font-bold text-zinc-200 underline">
          termos de uso{"\n"}
        </Text>{" "}
        e{" "}
        <Text className="font-bold text-zinc-200">
          políticas de privacidade
        </Text>
        .
      </Text>

      <Modal
        title="Selecionar Datas"
        subtitle="Selecione a data de ida e volta da viagem"
        visible={showModal === MODAL.CALENDAR}
        onClose={() => setShowModal(MODAL.NONE)}
      >
        <View className="gap-4 mt-4">
              <Calendar onDayPress={handleSelectDate} markedDates={selectedDates.dates} minDate={dayjs().toISOString()}/>
              <Button onPress={() => setShowModal(MODAL.NONE)}>
                <Button.Title>Confirmar</Button.Title>
              </Button>
        </View>
      </Modal>

      <Modal title="Selecionar convidados" subtitle="Os convidados irão receber e-mails para confirmar a participação na viagem.">
              <View className="my-2 flex-wrap gap-2 border-b border-zinc-800 py-5 items-start">
                <GuestEmail
                  email="Brenda@branda.com" onRemove={() => {}}
                />
              </View>

              <View className="gap-4 mt-4">
                <Input variant="secondary">
                  <AtSign color={colors.zinc[400]} size={20}/>
                  <Input.Field placeholder="Digite o e-mail do convidado" keyboardType="email-address"/>
                </Input>
                <Button>
                  <Button.Title>Convidar</Button.Title>
                </Button>
              </View>
      </Modal>
    </View>
  );
}
