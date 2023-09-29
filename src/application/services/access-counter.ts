export interface AccessCounterService {
  addCount(namespace: string): Promise<void>; 
  totalCount(namespace: string): Promise<number>; 
}
