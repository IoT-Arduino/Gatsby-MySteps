import React from 'react'
import BlogSingle from './BlogSingle'

const Blogs = ({blogs}) => {
  
	return (
		<div>
			<div>
			{blogs.map(({node})=>{
			 return <BlogSingle key={node.id} blog={node} />
			})
			}
			</div>	
		</div>	
	)
}

export default Blogs
