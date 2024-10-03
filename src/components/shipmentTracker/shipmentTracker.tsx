import { FC, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetShipmentQuery } from '../../store/api/api';
import { AppDispatch, RootState } from '../../store/store';
import ShipmentDetails from '../shipmentDetails/shipmentDetails';
import { BostaText, LogoContainer, NavInnerContainer, NavItem, NavItemRed, NavMenu, NavOuterContainer, LogoImg, MainContainer, ButtonHolder, FormHolder } from "./shipmentTracker.style";
import logo from "../../assets/img/logo.png";
import ShipmentProgress from '../shipmentProgress/shipmentProgress';
import { useTranslation } from 'react-i18next';
import { fetchShipmentFailure, fetchShipmentSuccess } from '../../store/slice/shipment.slice';

const ShipmentTracker: FC = () => {
  const { data, isLoading, error } = useSelector((state: RootState) => state.shipment);
  const [trackingNumber, setTrackingNumber] = useState<string>(data?.TrackingNumber || '3468570');
  const [inputValue, setInputValue] = useState<string>(''); 
  const dispatch = useDispatch<AppDispatch>();

  const { data: apiData, error: apiError, refetch } = useGetShipmentQuery(trackingNumber, {
    skip: !trackingNumber,
  });
  
  useEffect(() => {
    if (apiData && !apiError) {
      dispatch(fetchShipmentSuccess(apiData));
      console.log("TicketID: " + apiData.TrackingNumber);
    } else if (apiError) {
      dispatch(fetchShipmentFailure('Failed to fetch shipment data.'));
    }
  }, [apiData, apiError]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (inputValue && inputValue !== trackingNumber) {
      setTrackingNumber(inputValue);
      refetch();
    }
  };

  const [showForm, setShowForm] = useState(false);
  const { t, i18n } = useTranslation();

  const handleLanguageToggle = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    document.body.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.title = t('LOGO');
  }, [t]);

  return (
    <div>
      <NavOuterContainer>
        <NavInnerContainer>
          <LogoContainer>
            <LogoImg src={logo} alt='logo' />
            <BostaText>{t('LOGO')}</BostaText>
          </LogoContainer>
          <NavMenu>
            <NavItem>{t('Home')}</NavItem>
            <NavItem>{t('Prices')} </NavItem>
            <NavItem> {t('Contact')}</NavItem>
          </NavMenu>
          <NavMenu isMobVis={true}>
            <NavItem onClick={() => setShowForm(!showForm)} isSlected={showForm}>
              {t('TRACK_SHIPMENT')}
            </NavItem>
            <NavItem>{t('Login')}</NavItem>
            <NavItemRed onClick={handleLanguageToggle}>
              {i18n.language === 'ar' ? 'ENG' : 'AR'}
            </NavItemRed>
          </NavMenu>
        </NavInnerContainer>
        
        {showForm && (
          <FormHolder onSubmit={handleSubmit} isAR={ i18n.language === 'ar' }>
            <input
              type="text"
              placeholder={t('ENTER_TRACK_NO')}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <ButtonHolder>
            <button type="submit">{t('Search')}</button>
            </ButtonHolder>
          </FormHolder>
        )}
      </NavOuterContainer>

      <MainContainer>
        {data && <ShipmentProgress data={data}  />}
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {data && <ShipmentDetails data={data} />}
      </MainContainer>
    </div>
  );
};

export default ShipmentTracker;
