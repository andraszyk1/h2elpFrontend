import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Box
  } from '@chakra-ui/react'
  const steps = [
    { title: 'Utworzenie', description: 'Utworzenie zgłoszenia' },
    { title: 'Akceptacja', description: 'Dodanie Do Akcepacji jkowalski' },
    { title: 'Akceptacja', description: 'Akceptacja przez jkowalski' },
    { title: 'Zamknięcie', description: 'Zamknięte przez rkowalski' },
  ]
  
const HistoryStepper = () => {
    const { activeStep } = useSteps({
        index: 1,
        count: steps.length,
      })
  return (
    <Stepper index={activeStep} orientation='vertical' height='400px' gap='0'>
    {steps.map((step, index) => (
      <Step key={index}>
        <StepIndicator>
          <StepStatus
            complete={<StepIcon />}
            incomplete={<StepNumber />}
            active={<StepNumber />}
          />
        </StepIndicator>

        <Box flexShrink='0'>
          <StepTitle>{step.title}</StepTitle>
          <StepDescription>{step.description}</StepDescription>
        </Box>

        <StepSeparator />
      </Step>
    ))}
  </Stepper>
  )
}

export default HistoryStepper