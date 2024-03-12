import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MyServiceService } from 'src/app/my-service.service';

declare var bootstrap: any; // Declare the Bootstrap variable
declare var $: any;
import Swal from 'sweetalert2'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  expectedValue: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private MyServiceService: MyServiceService
    ) { 

  }

  token: any;
  username:any;
  tenant_uuid:any;
  subreddit_name:any;


  ngOnInit(){
    

    this.route.params.subscribe(params => {
      this.expectedValue = params['subreddit'];
      this.retrieveFromSessionStorage() 
      console.log(params['subreddit']);
    });
  }


  noteItems:any;
  noteItemsUserOnly:any;
  system_user_uuid:any;
  userlevel:any;
  
  retrieveFromSessionStorage() {
    this.token = sessionStorage.getItem('token');
    this.username = sessionStorage.getItem('username');
    this.tenant_uuid = sessionStorage.getItem('tenant_uuid');
    this.system_user_uuid = sessionStorage.getItem('uuid');
    this.userlevel = sessionStorage.getItem('userlvl');
    console.log(this.token);
    
    if (!this.token) {
      // Item not found in sessionStorage, redirect to /login
      this.router.navigate(['/login']);
    }
    else{
  

      this.retrieveData();

    }

  }

  removeFromSessionStorage() {
    sessionStorage.clear();
    window.location.reload();
  }

  editingItemId: string | null = null;

  toggleEditMode(attributeName: string) {
    const elements = $('[toggle="' + attributeName + '"]');
    const self = this; // Store reference to the component
    elements.each(function(this: HTMLElement) {
      const element = $(this);
      if (element.hasClass('hide')) {
        element.removeClass('hide');
      } else {
        element.addClass('hide');
      }
    });
  }

  retrieveData(){

    const getData = {
      tenant_uuid: this.tenant_uuid,
      subreddit_name: this.expectedValue
    };
    

    const getDataUserOnly = {
      tenant_uuid: this.tenant_uuid,
      subreddit_name: this.expectedValue,
      system_user_uuid: this.system_user_uuid
    };

    this.MyServiceService.getSubData(getData).subscribe(
      (response) => {
        this.noteItems = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    this.MyServiceService.getSubDataUseronly(getDataUserOnly).subscribe(
      (response) => {
        this.noteItemsUserOnly = response;
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteNotes(uuid:any){

    let json = {
      "tenant_uuid":this.tenant_uuid,
      "noteuuid":uuid
      }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
       
      
      this.MyServiceService.deleteNotes(json).subscribe(
          (response) => {
            this.retrieveData();
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your note has been deleted.",
              icon: "success"
            });
          },
          (error) => {
            swalWithBootstrapButtons.fire({
              title: "Something happened wrong",
              text: "Please contact administrator.",
              icon: "error"
            });
          }
        );

       
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
       
      }
    });
  }

  saveEditedData(attributeName: string, postuuid:any , text:any){
    console.log(text , "asdsadas");
   let parent = this
          const getData = {
            "notes": text,
            "tenant_uuid": parent.tenant_uuid,
            "noteuuid": postuuid
            }


            if (!getData.notes) {
              Swal.fire({
                icon: 'warning',
                title: 'Please add a note first'
              });
            }
            else{
              parent.MyServiceService.editNotes(getData).subscribe(
                (response) => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Note added successfully',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  parent.toggleEditMode(attributeName);
                  parent.retrieveData();
                },
                (error) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'There was an error adding the note.',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  console.log(error);
                }
              );
              parent.addnewToggle = false
            }

     



    console.log("attributeName: string", attributeName);
    console.log("postuuid:any", postuuid);
  }




  addnewNotesSave(category:any){
    const getData = {
      "subreddit_name": this.expectedValue,
      "system_user_uuid": this.system_user_uuid,
      "notes":this.addnewNotes,
      "category": category,
      "tenant_uuid": this.tenant_uuid
  }

  if (!getData.notes) {
    Swal.fire({
      icon: 'warning',
      title: 'Please add a note first'
    });
  }
  else{
    this.MyServiceService.addNewNotes(getData).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Note added successfully',
          showConfirmButton: false,
          timer: 1500
        });
        this.retrieveData();
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error adding the note.',
          showConfirmButton: false,
          timer: 1500
        });
        console.log(error);
      }
    );
    this.addnewToggle = false
  }





  console.log(getData);
  }

  addnewToggle = false;
  addnewNotes : any;

  toggleNewNotes(){
    this.addnewToggle = !this.addnewToggle;
  }
  
  addnewToggle1 = false;
  addnewNotes1 : any;

  toggleNewNotes1(){
    this.addnewToggle1 = !this.addnewToggle1;
  }


}
