'use client';

import FormPage from '@/components/_ui/form'
import RefundClaimForm from '@/components/RefundClaimForm'
import { Navbar } from '@/components/shared/Navbar';
import React from 'react'

export default function page() {
  const showToast = (message: string) => {
    // noop toast handler
    console.log('toast:', message)
  }

  const currentAirport = {} as any

  return (
    <div>
        {/* <FormPage /> */}
        <Navbar />
        <RefundClaimForm showToast={showToast} currentAirport={currentAirport} />
    </div>
  )
}
