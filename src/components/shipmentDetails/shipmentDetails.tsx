import { FC } from "react";
import { ShipmentResponse } from "../../types/type";
import {
  ShipmentAddress,
  ShipmentAddressHolder,
  ShipmentWrapper,
  StyledTable,
  TableHolder,
  Title,
} from "./shipmentDetails.style";
import { useTranslation } from "react-i18next";

const ShipmentDetails: FC<{ data: ShipmentResponse }> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <ShipmentWrapper>
      <TableHolder>
        <Title> {t("TABLE_TITLE")} </Title>
        <StyledTable>
          <thead>
            <tr>
              <th>{t("branch")}</th>
              <th>{t("date")}</th>
              <th>{t("time")}</th>
              <th>{t("details")}</th>
            </tr>
          </thead>
          <tbody>
            {data.TransitEvents.map((event, index) => (
              <tr key={index}>
                <td>{event.hub || "N/A"}</td>
                <td>{new Date(event.timestamp).toLocaleDateString()}</td>
                <td dir="ltr">
                  {new Date(event.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td>{t(event.state || "")}</td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableHolder>
      <ShipmentAddressHolder>
        <Title> {t("Address")} </Title>
        <ShipmentAddress>{t("ADDRESS")}</ShipmentAddress>
      </ShipmentAddressHolder>
    </ShipmentWrapper>
  );
};

export default ShipmentDetails;
