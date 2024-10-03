import { Container, TextContainer, TextHolder } from "./shipmentProgress.style";
import { FC, useEffect, useRef, useState } from "react";
import { StepperContainer, Step, ProgressBar, Progress } from "./shipmentProgress.style"; // Import your styled components
import { TiTick } from "react-icons/ti";
import { useTranslation } from "react-i18next";
import { ShipmentResponse } from "../../types/type";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaBoxOpen } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { TbCheckbox } from "react-icons/tb";

interface StepConfig {
  name: string;
  icon: JSX.Element; 
}

interface CheckoutStepperProps {
  stepsConfig: StepConfig[];
  activeStep?: number;
  isCancelled:boolean;
}
  
  const CheckoutStepper: React.FC<CheckoutStepperProps> = ({ stepsConfig = [], activeStep = 1,isCancelled=false }) => {
    const [margins, setMargins] = useState({ marginLeft: 0, marginRight: 0 });
    const stepRef = useRef<(HTMLDivElement | null)[]>([]);
  
    useEffect(() => {
      setMargins({
        marginLeft: (stepRef.current[0]?.offsetWidth ||0)/ 2,
        marginRight: (stepRef.current[stepsConfig.length - 1]?.offsetWidth ||0)/ 2,
      });
    }, [stepsConfig.length]);
  
    if (!stepsConfig.length) {
      return null;
    }
    const calculateProgressBarWidth = () => {
      const value=((activeStep - 1) / (stepsConfig.length - 1));
      if(value != 1) return (value*100)+2;
      return value * 100;
    };
    
    return (
        <StepperContainer>
          {stepsConfig.map((step, index) => (
            <Step
              key={step.name}
              isCancelled={isCancelled} 
              ref={(el) => (stepRef.current[index] = el)}
              className={`${activeStep > index + 1 || activeStep==4? "complete" : ""} ${activeStep === index + 1 ? "active" : ""}`}
            >
              <div className="step-number">
                {activeStep > index + 1 || activeStep==4 ? <TiTick size={24} /> : step.icon}
              </div>
              <div className="step-name">{step.name}</div>
            </Step>
          ))}
  
          <ProgressBar
            style={{
              width: `calc(100% - ${margins.marginLeft + margins.marginRight}px)`,
              marginLeft: margins.marginLeft,
              marginRight: margins.marginRight,
            }}
          >
            <Progress isCancelled={isCancelled} style={{ width: `${calculateProgressBarWidth()}%` }} />
          </ProgressBar>
        </StepperContainer>  
    );
  };


  
  const mapStateToStep = (state: string, isCancelled: boolean, transitEvents: { state: string }[]): number => {
    const getStateStep = (state: string): number => {
      switch (state) {
        case "TICKET_CREATED":
          return 1;
        case "PACKAGE_RECEIVED":
        case "IN_TRANSIT":
        case "OUT_FOR_DELIVERY":
          return 2;
        case "DELIVERY_FAILED":
        case "NOT_YET_SHIPPED":
          return 3;
        case "DELIVERED":
        case "DELIVERED_TO_SENDER":
          return 4;
        default:
          return 1;
      }
    };
  
    if (!isCancelled) {
      return getStateStep(state);
    }
  
    let highestStep = getStateStep(state);
  
    for (const event of transitEvents) {
      const currentStep = getStateStep(event.state);
      if (currentStep > highestStep) {
        highestStep = currentStep;
      }
    }
  
    return highestStep; 
  };
  const ShipmentProgress: FC<{ data: ShipmentResponse }> = ({ data }) => {
    const { t } = useTranslation();
    const isCancelled = data.CurrentStatus.state === "CANCELLED";
    const activeStep = mapStateToStep(data.CurrentStatus.state, isCancelled, data.TransitEvents);
    console.log("STEP:"+activeStep);
    const SHIPMENT_STEPS: StepConfig[] = [
      { name: t('TICKET_CREATED'), icon: <IoCreate size={24} /> },
      { name: t('PACKAGE_RECEIVED'), icon: <FaBoxOpen size={24} /> },
      { name: t('AVAILABLE_FOR_PICKUP'), icon: <CiDeliveryTruck size={24} /> },
      { name: t('DELIVERED'), icon: <TbCheckbox size={24} /> },]
    return (
      <Container>
        <TextContainer>
          <TextHolder isCancelled ={isCancelled} isFinished={activeStep===4}>
            <p>
              {t('ENTER_TRACK_NO')} {data.TrackingNumber}
            </p>
            <h2>
              {isCancelled ? t('CANCELLED') : t(data.CurrentStatus.state)}
            </h2>
          </TextHolder>
          <TextHolder>
            <p> {t('LAST_UPDATE')}</p>
            <h2>{new Date(data.CurrentStatus.timestamp).toLocaleDateString()}</h2>
          </TextHolder>
          <TextHolder>
            <p>{t('provider')}</p>
            <h2>{data.provider || "SOUQ.COM"}</h2>
          </TextHolder>
          <TextHolder>
            <p>{t('PromisedDate')}</p>
            <h2>{new Date(data.PromisedDate).toLocaleDateString()}</h2>
          </TextHolder>
        </TextContainer>
        <hr />
        <CheckoutStepper stepsConfig={SHIPMENT_STEPS} activeStep={activeStep} isCancelled={isCancelled} />
      </Container>
    );
  };
  
  export default ShipmentProgress;