import { Router } from "@reach/router"
import React from "react"
import SettingsCard from "../../components/atoms/settings-card"
import CoinsIcon from "../../components/fundamentals/icons/coins-icon"
import CrosshairIcon from "../../components/fundamentals/icons/crosshair-icon"
import DollarSignIcon from "../../components/fundamentals/icons/dollar-sign-icon"
import HappyIcon from "../../components/fundamentals/icons/happy-icon"
import MailIcon from "../../components/fundamentals/icons/mail-icon"
import MapPinIcon from "../../components/fundamentals/icons/map-pin-icon"
import TaxesIcon from "../../components/fundamentals/icons/taxes-icon"
import TruckIcon from "../../components/fundamentals/icons/truck-icon"
import UsersIcon from "../../components/fundamentals/icons/users-icon"
import ChannelsIcon from "../../components/fundamentals/icons/channels-icon"
import SettingsOverview from "../../components/templates/settings-overview"
import Currencies from "./currencies"
import Details from "./details"
import PersonalInformation from "./personal-information"
import Regions from "./regions"
import RegionDetails from "./regions/details"
import NewRegion from "./regions/new"
import ReturnReasons from "./return-reasons"
import Taxes from "./taxes"
import Users from "./users"
import FeatureToggle from "../../components/fundamentals/feature-toggle"

const SettingsIndex = () => {
  return (
    <SettingsOverview>
      <SettingsCard
        heading={"Regiony"}
        description={"Zarządzaj regionami sprzedaży"}
        icon={<MapPinIcon />}
        to={`/a/settings/regions`}
      />
      <SettingsCard
        heading={"Waluty"}
        description={"Zarządzaj walutami"}
        icon={<CoinsIcon />}
        to={`/a/settings/currencies`}
      />
      <SettingsCard
        heading={"Szczegóły sklepu"}
        description={"Zarządzaj szczegółami sklepu"}
        icon={<CrosshairIcon />}
        to={`/a/settings/details`}
      />
      <SettingsCard
        heading={"Dostawa"}
        description={"Zarządzaj profilami dostawy"}
        icon={<TruckIcon />}
        to={`/a/settings/shipping-profiles`}
        disabled={true}
      />
      <SettingsCard
        heading={"Powody zwrotu"}
        description={"Zarządzaj powodami zwrotów"}
        icon={<DollarSignIcon />}
        to={`/a/settings/return-reasons`}
      />
      <SettingsCard
        heading={"Zespół"}
        description={"Zarządzaj zespołem"}
        icon={<UsersIcon />}
        to={`/a/settings/team`}
      />
      <SettingsCard
        heading={"Informacje personalne"}
        description={"Zarządzaj swoim profilem"}
        icon={<HappyIcon />}
        to={`/a/settings/personal-information`}
      />
      <SettingsCard
        heading={"hello@medusajs.com"}
        description={"Potrzebujesz pomocy?"}
        icon={<MailIcon />}
        externalLink={"mailto: hello@medusajs.com"}
      />
      <SettingsCard
        heading={"Ustawienia podatków"}
        description={"Zarządzaj podatkami"}
        icon={<TaxesIcon />}
        to={`/a/settings/taxes`}
      />
      <FeatureToggle featureFlag="sales_channels">
        <SettingsCard
          heading={"Kanały sprzedaży"}
          description={"Przypisuj produkty do poszczególnych kanałów"}
          icon={<ChannelsIcon />}
          to={`/a/sales-channels`}
        />
      </FeatureToggle>
    </SettingsOverview>
  )
}

const Settings = () => (
  <Router className="h-full">
    <SettingsIndex path="/" />

    <Details path="details" />

    <Currencies path="currencies" />

    <ReturnReasons path="return-reasons" />

    <Regions path="regions" />
    <RegionDetails path="regions/:id" />
    <NewRegion path="regions/new" />

    <Taxes path="taxes" />

    <Users path="team" />

    <PersonalInformation path="personal-information" />
  </Router>
)

export default Settings
