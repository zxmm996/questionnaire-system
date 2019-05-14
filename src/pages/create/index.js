import { connect } from "unistore/react";

 function Create(props) {
  console.log('props=', props);
  return (
    <div>
     create
    </div>
  );
}

export default connect(state => state)((state) => (
  <Create {...state}/>  
));