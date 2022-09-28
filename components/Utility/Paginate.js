export const paginator=(pagenumber,pagecount,pizzaList)=>{
      const pizza=pizzaList.slice(pagenumber*pagecount-pagecount,pagenumber*pagecount)
      return pizza
}