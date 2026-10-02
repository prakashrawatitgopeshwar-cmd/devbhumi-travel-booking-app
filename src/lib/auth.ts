import {cookies} from 'next/headers';
import {createHmac,randomBytes,scryptSync,timingSafeEqual} from 'node:crypto';
import {readDB,User} from './store';
const secret=()=>process.env.SESSION_SECRET||'development-only-change-me-before-deploying-32chars';
export function hashPassword(password:string){const salt=randomBytes(16).toString('hex');return `${salt}:${scryptSync(password,salt,64).toString('hex')}`}
export function verifyPassword(password:string,stored:string){try{const [salt,key]=stored.split(':');const a=Buffer.from(key,'hex'),b=scryptSync(password,salt,64);return a.length===b.length&&timingSafeEqual(a,b)}catch{return false}}
export function newSession(userId:string){const payload=Buffer.from(JSON.stringify({sub:userId,exp:Date.now()+1000*60*60*24*7})).toString('base64url');return `${payload}.${createHmac('sha256',secret()).update(payload).digest('base64url')}`}
export function verifySession(token:string){try{const [p,s]=token.split('.');const expected=createHmac('sha256',secret()).update(p).digest();const got=Buffer.from(s,'base64url');if(got.length!==expected.length||!timingSafeEqual(got,expected))return null;const data=JSON.parse(Buffer.from(p,'base64url').toString());return data.exp>Date.now()?data.sub as string:null}catch{return null}}
export async function currentUser():Promise<User|null>{const jar=await cookies();const id=verifySession(jar.get('dbh_session')?.value||'');if(!id)return null;return (await readDB()).users.find(u=>u.id===id)||null}
export async function requireRole(roles:User['role'][]){const user=await currentUser();if(!user||!roles.includes(user.role))return {user:null as User|null,response:Response.json({error:'Unauthorized'}, {status:401})};return {user,response:null as Response|null}}
export function safeUser(u:User){const {passwordHash,...safe}=u;return safe}
