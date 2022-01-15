export class GithubDto {	
  action!: string;
  label?: Label; 
  organization!: Object;
    sender!: Sender;
}

class Sender {
  login!: string;
    id!: number;
    node_id!: string;
    url!: string;
    type!: string;
}

class Label {
  name!: string;
}
