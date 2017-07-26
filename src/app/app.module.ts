import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { PasswordPage } from '../pages/password/password';
import {Network} from "@ionic-native/network";

import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { HomePage } from '../pages/home/home';
import { IndexPage } from '../pages/index/index';
import { TitrePage } from '../pages/titre/titre';
import { MotifPage } from '../pages/motif/motif';
import { LocalPage } from '../pages/local/local';
import { PayementPage } from '../pages/payement/payement';
import { AdressePage } from '../pages/adresse/adresse';
import { CategoriePage } from '../pages/categorie/categorie';
import { ModalContentPage } from '../pages/seller-home/modalPage';
import { ModalItemPage } from '../pages/items/modalPage';
import { ImagepickPage } from '../pages/imagepick/imagepick';
import { SellerHomePage } from '../pages/seller-home/seller-home';
import { SignupPage } from '../pages/signup/signup';
import { IntroPage } from '../pages/intro/intro';
import { ItemsPage } from '../pages/items/items';
import { ItemImagePage } from '../pages/itemimage/itemimage';
import { GalleryPage } from '../pages/gallery/gallery';

import { LoginPage } from '../pages/login/login';
import { NouvelleAnnoncePage } from '../pages/nouvelle-annonce/nouvelle-annonce';
import { NewItemPage } from '../pages/new-item/new-item';
import { AnnonceserviceProvider } from '../providers/annonceservice/annonceservice';
import { Facebook } from '@ionic-native/facebook'
import { GooglePlus } from '@ionic-native/google-plus'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { UserProvider } from '../providers/user/user';
import { ItemProvider } from '../providers/item/item';


@NgModule({
  declarations: [
    MyApp,
    MotifPage,
    CategoriePage,
    PayementPage,
    AdressePage,
    PasswordPage,
    LocalPage,
    HomePage,
    GalleryPage,
    SignupPage,
    TitrePage,
    SellerHomePage,
    NouvelleAnnoncePage,
    ImagepickPage,
    ItemImagePage,
	ModalContentPage,
	ModalItemPage,
	IntroPage,
    IndexPage,
    ItemsPage,
    NewItemPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),

	HttpModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PasswordPage,
    HomePage,
    TitrePage,
	MotifPage,
    CategoriePage,
    PayementPage,
    AdressePage,
    LocalPage,
    GalleryPage,
    SellerHomePage,
    SignupPage,
	ModalContentPage,
	IntroPage,
	ModalItemPage,
    NouvelleAnnoncePage,
    ImagepickPage,
    ItemImagePage,
    IndexPage,
    ItemsPage,
    NewItemPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    Network,
    SplashScreen,
    ImagePicker,
    GooglePlus,
    Facebook,
	NativeStorage,
	AnnonceserviceProvider,
	File,
    Transfer,
    Camera,
    FilePath,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ItemProvider
  ]
})
export class AppModule {}
