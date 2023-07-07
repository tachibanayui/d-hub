import {Row} from "react-bootstrap"

import DefaultLayout from "../layouts/DefaultLayout";
const Profile = () => {
    return (
  <DefaultLayout>
      <Row>
        
      </Row>
   <Row style={{textAlign:'center'}}>

  
      <div class="card mb-3" style={{maxWidth:540}}>
      <div class="row g-0">
        <div class="col-md-4">
          <img src="..." class="img-fluid rounded-start" alt="..."></img>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Information</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
          </div>
        </div>
      </div>
    </div>
    </Row>
    </DefaultLayout>
    );
  }
  export default Profile;