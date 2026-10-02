import fs from 'node:fs/promises';
import path from 'node:path';
export type User={id:string,name:string,email:string,passwordHash:string,role:'traveller'|'provider'|'admin',createdAt:string,emailVerified:boolean};
export type Provider={id:string,userId:string,businessName:string,type:'stay'|'cab'|'tour',description:string,phone:string,status:'pending'|'approved'|'rejected'|'changes_requested',createdAt:string,adminNote?:string};
export type Booking={id:string,userId:string,providerId?:string,kind:'stay'|'cab'|'tour',destination:string,startDate:string,endDate?:string,guests:number,contact:string,notes:string,status:'requested'|'confirmed'|'cancelled',estimatedPrice:number,createdAt:string};
type DB={users:User[],providers:Provider[],bookings:Booking[],trips:unknown[],audit:{at:string,actor:string,action:string,detail:string}[]};
const empty:DB={users:[],providers:[],bookings:[],trips:[],audit:[]};
const file=()=>path.join(process.cwd(),'data','app-db.json');
let queue:Promise<unknown>=Promise.resolve();
export async function readDB():Promise<DB>{try{return {...empty,...JSON.parse(await fs.readFile(file(),'utf8'))}}catch{return structuredClone(empty)}}
export async function mutateDB<T>(fn:(db:DB)=>T|Promise<T>):Promise<T>{let result!:T;const run=async()=>{const db=await readDB();result=await fn(db);await fs.mkdir(path.dirname(file()),{recursive:true});const tmp=file()+'.tmp';await fs.writeFile(tmp,JSON.stringify(db,null,2),'utf8');await fs.rename(tmp,file())};queue=queue.then(run,run);await queue;return result}
export function audit(db:DB,actor:string,action:string,detail:string){db.audit.unshift({at:new Date().toISOString(),actor,action,detail});db.audit=db.audit.slice(0,500)}
