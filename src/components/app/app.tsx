import { JSX } from "react";
import {MainPage} from "../../pages/main-page/main-page";
import { FavoritesPage } from "../../pages/favourites-page/favourites-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { NotFoundPage } from "../../pages/not-found-page/not-found-page";
import { OfferPage } from "../../pages/offer-page/offer-page";

type AppMainPageProps = {
    rentalOffersCount: number;
}

function App({rentalOffersCount}: AppMainPageProps): JSX.Element {
    
    return(
        <MainPage rentalOffersCount={rentalOffersCount} />
    )
}

export default App;