import { Grid, Link } from '@nextui-org/react'
import { FC } from 'react'
import ReactPlayer from 'react-player'

import Layout from '@/components/layout/Layout'
import TitlePage from '@/components/ui/title-page/TitlePage'

const AboutUs: FC = () => {
	return (
		<Layout>
			<TitlePage title='О Нашей Компании' />
			<Grid.Container gap={2}>
				<Grid
					xs={0}
					sm={2}
					className='flex flex-col border-r border-gray border-opacity-30'
				>
					<div>
						<h2>Содержание</h2>
						<ol className='list-decimal'>
							<li>
								<Link href='#brief-company-history'>
									Краткая история компании
								</Link>
							</li>
							<li>
								<Link href='#production-features'>
									Особенности производства
								</Link>
							</li>
							<li>
								<Link href='#scaffolding-production'>
									Производство строительных лесов
								</Link>
							</li>
							<li>
								<Link href='#tour-tower-production'>
									Производство вышек-тур
								</Link>
							</li>
							<li>
								<Link href='#sale-and-delivery-scaffolding-and-tour-tower'>
									Продажа и доставка строительных лесов и вышек-тур
								</Link>
							</li>
						</ol>
					</div>
				</Grid>
				<Grid xs={12} sm={10} className='flex flex-col'>
					<div>
						<h2 id='brief-company-history'>Краткая история компании</h2>
						<p>
							Дмитровский завод строительных лесов был создан путем объединения
							трех заводов по производству строительных лесов и вышек-тур в г.
							Дмитрове, старейший из них был основан в 1989 г., прошел весь путь
							эволюции производства строительных металлоконструкций и в
							настоящее время продолжает свою успешную деятельность. Второе
							производственное предприятие первым в России в 1998 г. начало
							серийное производство вышек-тур и строительных лесов, именно с
							него брали пример остальные заводы. Третий завод был создан в
							начале 2008г, период его становления пришелся на самый пик
							мирового финансового кризиса, самое тяжелое время для строительной
							отрасли, но предприятие не только успешно преодолело финансовые
							трудности, но и увеличило объем производства на 75%, что,
							безусловно, является рекордным показателем не только в сфере
							производства строительного оборудования, но и в объеме
							промышленного производства в целом для текущих экономических
							условий.
						</p>
						<p>
							После объединения мы стали крупнейшим производителем строительных
							лесов в России и накопили колоссальный опыт в этой области, нашими
							клиентами являются ведущие предприятия строительной отрасли, наше
							строительное оборудование эксплуатируется на крупнейших
							строительных объектах.
						</p>
						<p>
							Мы гордимся нашим заводом и всегда готовы к сотрудничеству на
							взаимовыгодных условиях, рады предложить нашим дилерам и конечным
							потребителям только лучшие цены и отличное качество продукции.
						</p>
						<div className='flex justify-center p-4'>
							<ReactPlayer url='https://youtu.be/NndkPBkUg6g' controls />
						</div>

						<h2 id='production-features'>Особенности производства</h2>
						<p>
							Строительные вышки туры и строительные рамные леса необходимы при
							большом количестве наружных и интерьерных работ в различных
							областях строительной, ремонтной, реставрационной и дизайнерской
							сферы. Качество конструкций напрямую влияет на сроки проведения
							работ и их безопасность, а ценовое решение оказывает существенное
							влияние на общую смету проекта. Заказ вышек тур и строительных
							лесов производства Дмитровского завода позволяет получить рамную
							продукцию с оптимальным соотношением цена/качество и добиться
							высочайшей эффективности проведения всех рабочих процессов,
							связанных с необходимостью работ на лесах или вышках.
						</p>

						<h2 id='scaffolding-production'>Производство строительных лесов</h2>
						<p>
							Компания производит рамные строительные леса универсального типа,
							позволяющие выполнять работы на объектах высотой до 60 метров. Для
							продукции характера продуманная конструкция, полностью
							соответствующая действующим стандартам и нормативам, качественные
							материалы и надёжные соединения. Производство строительных лесов и
							вышек тур оперативно и качественно, с соблюдением всех высоких
							стандартов качества — это призвание наших опытных специалистов,
							поэтому, если Вы нуждаетесь в гибких и эффективных решениях, то
							выбрать нас — правильное решение!
						</p>
						<p>
							Для изготовления продукции такого типа мы применяем самое
							высокотехнологичное оборудование, а так же наша продукция проходит
							очень строгий контроль качества, ведь безопасность и последующая
							продажа после производства строительных лесов и вышек тур — это
							очень важно!
						</p>

						<h2 id='tour-tower-production'>Производство вышек-тур</h2>
						<p>
							Вышки туры производятся на той же промышленной базе, что и
							строительные леса и отличаются столь же высокими практическими
							характеристиками. Стоит отметить высокую долговечность, отличное
							качество защитно-эстетического полимерного покрытия, а также
							продуманность в плане эргономики (что важно для ускорения работ с
							громоздким инструментом).
						</p>

						<h2 id='sale-and-delivery-scaffolding-and-tour-tower'>
							Продажа и доставка строительных лесов и вышек-тур
						</h2>
						<p>
							Собственная производственная база, большой опыт в поставках для
							строительных компаний и продуманная логистическая схема позволяют
							обеспечить не только действительно высокое качество и долгий срок
							службы всех элементов конструкций, но и следовать одной из
							наиболее выгодных ценовых политик как для крупнооптовых, так и для
							розничных покупателей. Обращаясь к нам за строительными лесами или
							вышками турами, вы можете быть полностью уверены в компетентности
							менеджеров, решающих любые вопросы «на передовой», то есть без
							обращения к инженерам, а также в полном отслеживании нами поставки
							от завода до вашего объекта. Благодаря наличию собственного
							транспорта мы обеспечиваем не просто оперативную, но и очень
							выгодную (льготную или бесплатную) доставку любых объёмов
							продукции завода. Продажа строительных лесов и вышек тур
							осуществляется постоянно, а ассортимент пополняется. Сделать заказ
							можно очень быстро и просто: мы стремимся решать вопросы любого
							уровня максимально оперативно и профессионально.
						</p>
					</div>
				</Grid>
			</Grid.Container>
		</Layout>
	)
}

export default AboutUs
