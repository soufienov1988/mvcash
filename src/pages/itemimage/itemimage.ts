import { Component } from '@angular/core';
import { NavController ,NavParams,ActionSheetController, ToastController, Platform, LoadingController, Loading } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer , TransferObject} from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import {Http} from '@angular/http';
import { ItemsPage } from '../items/items';
import { Item } from '../new-item/item';
import { ImagePicker } from '@ionic-native/image-picker';
import { ItemProvider } from '../../providers/item/item';
import { NewItemPage } from '../new-item/new-item';

declare var cordova: any;
@Component({
  selector: 'itemimage',
  templateUrl: 'itemimage.html'
})
export class ItemImagePage {
bt0:boolean=false;
bt1:boolean=false;
bt2:boolean=false;
bt3:boolean=false;
bt4:boolean=false;
bt5:boolean=false;
 lastImage: string[] = ["p","p","p","p","p","p"];
 paths: string[]  =new Array(); taken=0;

 removes: string[]  =new Array();
 targets: string[] =new Array();
 filenames: string[] =new Array();
 fullremotePaths: string[] =new Array();
remotePaths: string[] =new Array();
  loading: Loading;annonce;
baseUrl:string="https://socialapps.000webhostapp.com/"
 test:boolean;item:any;
  constructor(public navCtrl: NavController,public itemprovider:ItemProvider,public np:NavParams,public ip: ImagePicker,public http:Http, private camera: Camera, private transfer: Transfer, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public platform: Platform, public loadingCtrl: LoadingController) {
this.item=<Item>this.np.get("item");
this.annonce=this.np.get("annonce");
if(this.item.photos){
let str=<string>this.item.photos;
this.remotePaths=str.split(","); 
var i; for(i=0;i<this.remotePaths.length;i++){this.fullremotePaths[i]=this.baseUrl+this.remotePaths[i];this["bt"+i]=true;}
this.lastImage=this.fullremotePaths.concat(this.lastImage);
this.lastImage=this.lastImage.slice(0,6);
}
this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  }
 
  public presentActionSheet(rg:number) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.openGallery();
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA,rg);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }
 public takePicture(sourceType,rg:number) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true
  };
 
  // Get the data of an image
  this.camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      this.filePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),rg);
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),rg);
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}
private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName,rg:number) {
  this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage[rg]=newFileName;this.show(rg);
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {console.log("img "+img);
	if(img.includes("http")||img.includes("file")){return img;}
  if (img === null || img == "p") {
    return 'camera.png';
  } else {
    return cordova.file.dataDirectory + img;
  }
}
public uploadImage() {
  // Destination URL
 
this.loading.present(); 
this.uploadImagesArray();

  
} 
public hide(rg:number){
switch(rg){
case 0: this.bt0=false;break;
case 1: this.bt1=false;break;
case 2: this.bt2=false;break;
case 3: this.bt3=false;break;
case 4: this.bt4=false;break;
case 5: this.bt5=false;break;
}
if(this.lastImage[rg].includes("http")){this.removes.push(this.lastImage[rg].replace(this.baseUrl,""));}
this.lastImage[rg]="p";
}
uploadImagesArray(){
var i;
 var filename ;var targetPath;
 for(i=0;i<this.lastImage.length;i++){
 filename = this.lastImage[i];
  // File for Upload
  if(filename !="p" && !filename.includes("http")){//console.log("filename "+filename);
  if(filename.includes("file"))
 { targetPath=filename; this.filenames.push(filename.substr(filename.lastIndexOf("/")+1,filename.length));this.targets.push(targetPath);
}
  else
 { targetPath = this.pathForImage(filename);this.filenames.push(filename);this.targets.push(targetPath);}
 
 
 }
  }
  // File name only
  
 
  
 this.itemprovider.setAttributes(this.filenames,this.paths,this.removes,this.targets,this.fullremotePaths,this.remotePaths);
this.navCtrl.push(NewItemPage,{"item":this.item,"annonce":this.annonce});
  
 
  // Use the FileTransfer to upload the image
  
  	
  	
}

public show(rg:number){

switch(rg){
case 0: this.bt0=true;break;
case 1: this.bt1=true;break;
case 2: this.bt2=true;break;
case 3: this.bt3=true;break;
case 4: this.bt4=true;break;
case 5: this.bt5=true;break;
}
}

  private openGallery (): void {
  let options = {
    maximumImagesCount: 6-this.taken,
    width: 500,
    height: 500,
    quality: 75
  }

  this.ip.getPictures(options).then(
    file_uris => {this.mergeArrays(file_uris);this.taken+=file_uris.length;},
    err => console.log('uh oh')
  );
}
public mergeArrays(uris){var i;
for(i=0;i<this.lastImage.length;i++){
if(this.lastImage[i]=="p"){let str=uris.pop();if(str){this.lastImage[i]=str; this.show(i);}}
}
}
suivant(){this.uploadImagesArray();
}
}
