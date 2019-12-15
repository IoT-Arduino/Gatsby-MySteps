import React from "react"

import Grid from "@material-ui/core/Grid"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

const RelatedGrid = ({ grids }) => {

//   use static image file in case of no API image retirived
  let imageThumbnail = grids.thumbnail.fluid.src
//   if (grids.thumbnail === 'Other'){
//     imageThumbnail = '../../pic1.jpg'
//   } else if (grids.thumbnail === 'Udemy'){
//     imageThumbnail = '../../udemy.jpg'
//   } else {
//     imageThumbnail = grids.thumbnail
//   }
 
  return (
    <Grid item xs={12} sm={6} md={4} style={{ padding: 24 }}>
      <Card>
        <CardMedia
        style={{ height: 0, paddingTop: "56.25%" }}
        image={imageThumbnail}
        title={grids.Title}
        />

        <CardContent>
        <Typography
            gutterBottom
            variant="inherit"
            component="h3"
            style={{ height: 40, overflow: "hidden", fontSize: "18px" }}
        >
            {grids.title}
        </Typography>
        <Typography component="p" style={{ marginBottom: "10px" }}>
            "{grids.excerpt.substr(0, 50)} ..."
        </Typography>
        </CardContent>

        <CardActions>
        <Button
            size="small"
            color="primary"
            href={`/blog/${grids.slug}`}
            target="_blank"
        >
            Go to Post
        </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default RelatedGrid
