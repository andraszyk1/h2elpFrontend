import React from "react";
const TicketPosts: React.FC<{}> = () => {
  let user:string="Typescript-fragment";
  let count:number;
  count=1
  class Pizzeria {
    name;
    constructor(name:string){
      this.name=name;
    }
  }

  const lastrada =new Pizzeria("lastrata")
    return (
      <div>
        <h3>{lastrada.name}</h3>
      <p>{count}</p>
      </div>
    );
  };
  
  export default TicketPosts;
  
