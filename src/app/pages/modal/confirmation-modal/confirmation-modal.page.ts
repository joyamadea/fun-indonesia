import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslatesService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.page.html',
  styleUrls: ['./confirmation-modal.page.scss'],
})
export class ConfirmationModalPage implements OnInit {
  @Input() type;

  message: any;
  button: any;
  constructor(private modalController: ModalController, private translateService: TranslatesService) { }

  ngOnInit() {
    this.modalMessage();
  }

  async action(value) {
    await this.modalController.dismiss(value);
  }
  async dismissModal() {
    await this.modalController.dismiss();
  }

  async modalMessage(){
    if(this.type == 'logout'){
      this.message = await this.translateService.translateMessage('CONFIRM_MODAL_LOGOUT');
      this.button = await this.translateService.translateMessage('LOGOUT');
    } else if(this.type == 'delete'){
      this.message = await this.translateService.translateMessage('CONFIRM_MODAL_LOGOUT');
      this.button = await this.translateService.translateMessage('DELETE');
    }
    
  }
}
