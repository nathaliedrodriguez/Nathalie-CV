import React from 'react'

export default function footer() {
  return (
    <footer className="bg-[#f2f8fb] py-8 px-4 md:px-16 mt-8 -mx-3 md:-mx-8 rounded-t-[50px]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pb-16">
        <div className="flex flex-col items-center gap-4 mb-4 md:mb-0">
          <img src="/HomePage/icons/star.png" className="w-24 h-24" alt="StarIcon" />
          <div>
            <h3 className="font-title font-bold text-lg text-[#0679B8]">Nathalie D. Rodriguez</h3>
            <p className="font-body text-xs text-[#101113]">
              UX / UI Designer - B.A. in Social Communication
            </p>
          </div>
        </div>
      </div>
      <div className="w-full text-center font-body text-sm text-[#101113]">Copyright © 2024 natyline</div>
    </footer>
  )
}
