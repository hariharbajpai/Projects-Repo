import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'

const UpdateProfileDialog = () => {
  return (
    <div>
        <Dialog open = {open}>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Profile </DialogTitle>
                    </DialogHeader>
                    <form action="">
                        <div className='grid gap-4 py-4'>
                            <Label htmlfor ="name">Name</Label>
                        </div>
                    </form>
                </DialogContent>
        </Dialog>
    </div>
  )
}

export default UpdateProfileDialog
